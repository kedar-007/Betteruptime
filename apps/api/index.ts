import express from "express";
import { prismaClient } from "store/client";
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";
import "dotenv/config"; 
import { signinSchema,signupSchema } from './types';
import { requireAuth } from "./middleware";
import cors from "cors";



const app = express();
app.use(express.json()); // important
app.use(cors())


//----SIGNUP ENDPOINT -----//

app.post("/signup",async (req,res) =>{
  
    try {
        // Validate input
        const parsed = signupSchema.safeParse(req.body);
        console.log("Parsed",parsed);

        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid Input",
                errors:parsed.error.flatten()
            });
        }

        const {username,password} = parsed.data;

        //----------------------
        // Check for user exists
        //----------------------

        const existingUser = await prismaClient.user.findFirst({
            where:{username}

        })

      

        if(existingUser){
            return res.status(409).json({message:"User already exists"})
        }

        //--------Hash Pasword-----//

        const hashedPassword = await bcrypt.hash(password,10);

        // ------ SAVE USER TO DB ------//
        const user = await prismaClient.user.create({
            data:{
                username,
                password:hashedPassword
            },
        });

        // return the response
        const token = jwt.sign({
          userId:user.id,
          username:user.username
        },process.env.JWT_SECREAT!);
    
    
        return res.status(201).json({
            message:"User created successfully",
            user:{
                id:user.id,
                username:user.username
            },
            token
        })
    } catch (error) {
        console.log("Signup error",error);
        return res.status(500).json({
            message:"Internal server error"
        })
        
    }
})

//------SIGNIN ENDPOINT -------//
app.post("/signin",async (req,res) =>{

  try {
    //Validate the input
    const parsed = signinSchema.safeParse(req.body);
    if(!parsed.success){
      return res.status(409).json({message:"Invalid input",errors:parsed.error.flatten()})
    }

    const {username,password} = parsed.data;

    //Get the user and password from the db

    const user = await prismaClient.user.findFirst({
      where:{username}
    })

    if(!user){
      return res.status(404).json({
        message:"User not foud"
      })
    }

    //Compare the password

    const isComparedPassword = await bcrypt.compare(password,user.password);

    if(!isComparedPassword){
      return res.status(401).json({
        message:"Invalid Password"
      })
    };

    //Generate the jwt and sign

    const token = jwt.sign({
      userId:user.id,
      username:user.username
    },process.env.JWT_SECREAT!);


    // Return the response

    return res.status(200).json({
      message:"Login Successfull",
      token
    })
    
  } catch (error) {
    console.error("Signin error",error);
    return res.status(500).json({
      message:"Internal server error"
    })
  }

})
// POST /website
app.post("/website",requireAuth, async (req, res) => {
  const userId = req.user.userId;
  console.log("USERID",userId);
  console.log("BODY",req.body);

  const website = await prismaClient.website.create({
    data: {
      url: req.body.url,
      user_id:userId
    },
  });
  res.json({ message: "Website added successfully", website });
});

// GET /status/:websiteId
app.get("/status/:websiteId", requireAuth, async (req, res) => {
  try {
    const websiteId = req.params.websiteId;

    // MAIN QUERY: fetch website + last 10 ticks
    const website = await prismaClient.website.findFirst({
      where: {
        id: websiteId,
        user_id: req.user.userId,
      },
      include: {
        ticks: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    // AGG DATA: count Up/Down/Unknown
    const stats = await prismaClient.website_tick.groupBy({
      by: ["status"],
      where: { website_id: websiteId },
      _count: true,
    });

    // Convert groupBy result
    const upCount = stats.find(s => s.status === "Up")?._count || 0;
    const downCount = stats.find(s => s.status === "Down")?._count || 0;
    const unknownCount = stats.find(s => s.status === "Unknown")?._count || 0;

    const total = upCount + downCount + unknownCount;
    const uptimePercent = total > 0 ? Math.round((upCount / total) * 100) : 0;

    // AVG RESPONSE TIME (all time)
    const avgResponse = await prismaClient.website_tick.aggregate({
      where: { website_id: websiteId },
      _avg: { response_time_ms: true },
    });

    // LAST STATUS
    const latestStatus = website.ticks[0]?.status || "Unknown";

    return res.status(200).json({
      website: {
        id: website.id,
        url: website.url,
      },
      latestStatus,
      last10: website.ticks,
      stats: {
        up: upCount,
        down: downCount,
        unknown: unknownCount,
        total,
        uptimePercent,
        avgResponseTime: avgResponse._avg.response_time_ms || 0,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1️⃣ Fetch all websites for this user
    const websites = await prismaClient.website.findMany({
      where: { user_id: userId },
      include: {
        ticks: {
          orderBy: { createdAt: "desc" },
          take: 10, // last 10 ticks per website
        },
      },
    });

    // 2️⃣ Prepare dashboard data per website
    const dashboardData = await Promise.all(
      websites.map(async (website) => {
        // Aggregates for this website
        const statsAgg = await prismaClient.website_tick.groupBy({
          by: ["status"],
          where: { website_id: website.id },
          _count: true,
        });

        const upCount = statsAgg.find(s => s.status === "Up")?._count || 0;
        const downCount = statsAgg.find(s => s.status === "Down")?._count || 0;
        const unknownCount = statsAgg.find(s => s.status === "Unknown")?._count || 0;

        const total = upCount + downCount + unknownCount;
        const uptimePercent = total > 0 ? Math.round((upCount / total) * 100) : 0;

        const avgResponse = await prismaClient.website_tick.aggregate({
          where: { website_id: website.id },
          _avg: { response_time_ms: true },
        });

        return {
          id: website.id,
          url: website.url,
          latestStatus: website.ticks[0]?.status || "Unknown",
          last10Ticks: website.ticks,
          stats: {
            up: upCount,
            down: downCount,
            unknown: unknownCount,
            total,
            uptimePercent,
            avgResponseTime: avgResponse._avg.response_time_ms || 0,
          },
        };
      })
    );

    // 3️⃣ Return dashboard
    res.json({
      message: "User dashboard fetched successfully",
      websites: dashboardData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


//get all website of the users

app.get("/all",requireAuth,async (req,res) =>{
  console.log("ENTERED")
  try {
    const userId = req.user.userId;
    const websites = await prismaClient.website.findMany({
      where:{
        user_id:userId
      }
    })
    //websites
  
    return res.status(200).json({
      success:true,
      data:websites
    })
  } catch (error) {
    
  }
})

app.listen(3002, () => {
  console.log("Server is running on PORT 3002");
});

export default app;