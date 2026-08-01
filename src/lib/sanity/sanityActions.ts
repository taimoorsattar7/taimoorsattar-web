import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || '7p4bxs1b',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_API_TOKEN || process.env.GATSBY_SANITY_BEARER_TOKEN, // Only if you want to update content with the client
})


export const sanityRequest = async (query: string) => {
  try {
    const request = await client.fetch(query)
    return request
  } catch (err) {
    return []
  }
}

export const sanityCreate = async (action: String = "create", post: any) => {
  try {
    let result
    if (action == "createOrReplace") {
      result = client.createOrReplace(post)
    } else if (action == "createIfNotExists") {
      result = client.createIfNotExists(post)
    } else {
      result = client.create(post)
    }
    return result
  } catch (err) {
    return []
  }
}

export const sanityUpdate: any = async (_id: any, obj: any) => {
  try {
    const result = client.patch(_id).set(obj).commit()
    return result
  } catch (err) {
    return []
  }
}
