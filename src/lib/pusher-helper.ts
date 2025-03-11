const Pusher = require("pusher")
const PusherClient = require("pusher-js")

export const pusherServer = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
})

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_KEY!,
    {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    }
)