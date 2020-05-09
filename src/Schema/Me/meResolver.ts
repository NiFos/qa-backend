import { getUser } from "../../utils/db/Controllers/Users"

export const meResolver = {
  profile: async (parent, args, context, info) => {
    const { id } = context.user;
    return await getUser(id);
  }
}