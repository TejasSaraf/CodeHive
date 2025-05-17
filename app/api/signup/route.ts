import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { fullName, email, password } = await req.json();

  console.log("→ AWS_REGION:", process.env.AWS_REGION);
  console.log("→ AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
  console.log("→ AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
  console.log("→ DYNAMODB_TABLE_NAME:", process.env.DYNAMODB_TABLE);

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  const docClient = DynamoDBDocumentClient.from(client);
  const sub = randomUUID();

  try {
    await docClient.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_TABLE!,
        Item: {
          sub,
          fullName,
          email,
          password,
          createdAt: new Date().toISOString(),
        },
      })
    );
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DynamoDB error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
