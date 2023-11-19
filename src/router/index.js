import { searchBook } from "~/controllers/search.controller";
import routerAuth from "./auth.router";
import routerBook from "./book.router";
import routerCategory from "./category.router";
import routerUpload from "./upload.router";
import routerUser from "./user.router";
import routerOrder from "./order.router";

export default function routerApp(app) {
    app.use("/auth", routerAuth);
    app.use("/api/books", routerBook);
    app.use("/api/users", routerUser);
    app.use("/api/categories", routerCategory);
    app.use("/api/images", routerUpload);
    app.get("/api/search", searchBook);
    app.use("/api/orders", routerOrder);
}
