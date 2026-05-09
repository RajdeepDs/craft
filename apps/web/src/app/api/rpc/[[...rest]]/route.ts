import { rpcHandler } from "@craft/rpc/server";
import type { NextRequest } from "next/server";

export const GET = (req: NextRequest) => rpcHandler(req);
export const POST = (req: NextRequest) => rpcHandler(req);
export const PUT = (req: NextRequest) => rpcHandler(req);
export const PATCH = (req: NextRequest) => rpcHandler(req);
export const DELETE = (req: NextRequest) => rpcHandler(req);
