import { getUser } from "../../utils/db/Controllers/Users"

export const meResolver = {
  profile: async (parent: any, args: any, context: any, info: any) => {
    const { id } = context.user;
    return await getUser(id);
  }
}