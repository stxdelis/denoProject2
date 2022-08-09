import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const mainRouter = new Router();

const getRandomFortune = async (): Promise<string> => {
	const response = await fetch("https://api.sen.cat/api/fortune");
	const jsonBody: { fortune: string } = await response.json();
	return jsonBody.fortune;
};

mainRouter.get("/", async (ctx: Context) => {
	const fortune = await getRandomFortune();
	ctx.response.headers.set("content-type", "text/html; charset=utf-8");
	ctx.response.body = `<pre>Your fortune:\n${fortune}</pre>`;
});

app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());

await app.listen({ port: 8085 }); // change me for localhost to 8085
