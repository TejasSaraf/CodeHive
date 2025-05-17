import ImageKit from "imagekit-javascript";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

if (!publicKey || !urlEndpoint) {
  throw new Error("Missing ImageKit publicKey or urlEndpoint in .env.local");
}

export const imagekit = new ImageKit({
  publicKey,
  urlEndpoint,
});
