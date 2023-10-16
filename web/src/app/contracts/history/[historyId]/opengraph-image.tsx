import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "View History on Contrak";
export const size = {
  width: 800,
  height: 400,
};
export const contentType = "image/png";

export default async function Image() {
  const contract = {
    name: "Test Contract",
  };
  const satoshiBold = await fetch(
    new URL("./Satoshi-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  return new ImageResponse(
    (
      <div tw="flex flex-col items-start justify-end w-full h-full p-8 bg-black text-white">
        <span tw="text-lg text-blue-500">Contrak</span>
        <h1 tw="leading-tight text-4xl font-bold mb-0 mt-3">{contract.name}</h1>
        <p tw="mt-3 mb-6 text-xl text-gray-300">
          Hardhat Local - 0x9A676e781A523b5d0C0e43731313A708CB607508
        </p>
        <div tw="flex items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          <span tw="ml-2">Solidity</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Satoshi Bold",
          data: satoshiBold,
        },
      ],
    }
  );
}
