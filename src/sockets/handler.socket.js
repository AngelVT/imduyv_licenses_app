import { Server } from "socket.io";
import { verifySocketToken } from "./jwt.socket.js";
import { SECRET_COOKIE } from "../configuration/environment.configuration.js";
import cookie from "cookie";
import signature from "cookie-signature";

let io;

export async function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            credentials: true
        }
    });

    io.use(async (socket, next) => {
        try {
            const rawCookie = socket.request.headers.cookie;
            if (!rawCookie) return next(new Error("No cookies"));

            const cookies = cookie.parse(rawCookie);

            const token = cookies["access_token"];
            if (!token) return next(new Error("No signed cookie"));

            if (token.substr(0, 2) !== "s:")
            return next(new Error("Cookie is not signed"));

            const unsignedToken = signature.unsign(token.slice(2), SECRET_COOKIE);

            if (!unsignedToken)
            return next(new Error("Invalid signature"));

            const payload = await verifySocketToken(unsignedToken);

            if (!payload) {
                socket.emit("auth_error", { message: "Invalid or expired token" });
                return socket.disconnect(true);
            }

            socket.user = payload;

            next();
        } catch (err) {
            next(new Error("Authentication failed"));
        }
    });

    io.on("connection", socket => {
        //console.log("Client connected:", socket.id);

        const { uuid, group, permissions } = socket.user;

        socket.join(`user_${uuid}`);

        if (permissions.includes('license:update') || permissions.includes('license:manage')) {
            socket.join('internal_channel');
        }

        if (group === 'consultant' && permissions.includes('consultant:comment')) {
            socket.join('external_channel');
        }

        socket.on("disconnect", () => {
            //console.log("Client disconnected:", socket.id);
        });
    });
}

export function getIO() {
    return io;
}