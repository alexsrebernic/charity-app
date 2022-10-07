import { createCan } from "../controllers/canController"


export default async (network,data) => {
    const abi = await (await fetch('../abis/Donee.json')).json()
    await createCan(network,data)
}