import { prismaClient } from "store/client";
import { xAddBulk } from "redisstream/client";
// Pusher that would push the all websites in to the redis stream and the stream and worker will read the queue and will hit the websites
async function main() {
    let websites = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true
        }
    })

    console.log("WEBSITES",websites);
  
    await xAddBulk(websites.map(w => ({
        url: w.url,
        id: w.id
    })));
}

setInterval(() => {
    main()
}, 3 * 1000 * 60)

main()