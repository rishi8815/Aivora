import { mutation, query } from "../_generated/server"
import { ConvexError, v } from "convex/values"





export const getOne = query({
    args: {
        conversationId: v.id("conversations"),
        contactSessionId: v.id("contactSessions"),
        
    },
    handler: async (ctx, { conversationId, contactSessionId, }) => {
        const session = await ctx.db.get(contactSessionId);

        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
            code:"UNAUTHORIZED",
            message:"Invalid session"
            });
        }
        const conversation = await ctx.db.get(conversationId);
        
        if(!conversation)return null;

        return {
            _id:conversation._id,
            threadId:conversation.threadId,
            status:conversation.status,
            
        }
    }
})


export const create = mutation({
    args: {
        organizationId: v.string(),
        contactSessionId: v.id("contactSessions"),
        
    },
    handler: async (ctx, { organizationId, contactSessionId, }) => {
        const session = await ctx.db.get(contactSessionId);

        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
            code:"UNAUTHORIZED",
            message:"Invalid session"
            });
        }
        // TODO :Temporary
        const threadId = "123"

        const conversationId = await ctx.db.insert("conversations",{
            organizationId:organizationId,
            contactSessionId:session._id,
            status: "unresolved",
            threadId,
        });

        return conversationId;
    }
})
