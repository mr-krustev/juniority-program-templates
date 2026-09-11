import Koa from "koa";
import bodyParser from "koa-body";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

type User = {
  username: string;
  email: string;
  password: string;
};

type UserAuthDTO = Pick<User, "username" | "password">;
type EmailAuthDTO = Pick<User, "email" | "password">;

type AuthDTO = UserAuthDTO | EmailAuthDTO;

type Friend = {
  username: string;
};

const isUser = (body: unknown): body is User => {
  return (
    typeof body === "object" &&
    body !== null &&
    "username" in body &&
    "password" in body
  );
};

app.use(bodyParser());

router.post("/test", async (ctx) => {
  const body = ctx.request.body as AuthDTO;
  console.log("POST /test", ctx.request.body);

  if (!isUser(body)) {
    ctx.status = 400;
    ctx.body = { error: "Invalid request body" };
    return;
  }

  ctx.body = { message: "User created" };
});

router.get("/", (ctx) => {
  console.log("GET /");

  ctx.body = "Hello World";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
