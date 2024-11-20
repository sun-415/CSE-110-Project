import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const client = new OAuth2Client("130824139626-b0tcvptr6rr7ka9l8c0ipmvfik3fc2e5.apps.googleusercontent.com");
  if (!body) {
    const response = NextResponse.json(
      {
        message: "Invalid body",
      },
      {
        status: 400,
      }
    );
    return response;
  }

  async function verify(body: any) {
    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: "130824139626-b0tcvptr6rr7ka9l8c0ipmvfik3fc2e5.apps.googleusercontent.com",
    });
    console.log("lool");
    const payload = ticket.getPayload();
    return payload;
  }

  try {
    const payload = await verify(body).catch(console.error);
    return NextResponse.json(payload);
  } catch (error) {
    const response = NextResponse.json(
      {
        code: 400,
        message: error instanceof Error ? error.message : "Unknown",
      },
      {
        status: 400,
      }
    );
    return response;
  }
}