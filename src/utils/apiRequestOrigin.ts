import { headers } from "next/headers";
import { NextRequest } from "next/server";

const validOrigin = (req: NextRequest) => {
    const referer = headers().get("referer");
    return referer?.includes(process.env.DOMAIN_NAME!);
};

export default validOrigin;