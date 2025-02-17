import Prompt from "@/models/prompt";
import connectToDB from "@/utils/database";

export const POST = async (req) => {
    const {userId, prompt,tag} = await req.json();

    try {
        await connectToDB();
        // Everytime we need to call this because it dies once its done its job(Means it is a lambda function)
        const newPrompt = new Prompt({
            creator: userId,
            prompt, 
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create a new error", {status: 500});
    }
}