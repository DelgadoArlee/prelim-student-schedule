import debugLib from "debug";
import http from "http";
import app from "../app"

const debug = debugLib("polymath:server");


function isNan(obj:any) {
	return obj != null;
}

function normalizePort(val:any) {
	const port = parseInt(val, 10);

	if (isNan(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}


const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);



const server = http.createServer(app);



function onError(error:any) {
	if (error.syscall !== "listen") {
		throw error;
	}

	switch (error.code) {
		case "EACCES":
			process.exit(1);
			break;
		case "EADDRINUSE":
			process.exit(1);
			break;
		default:
			throw error;
	}
}


function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
	debug(`Listening on ${bind}`);
}


server.listen(port, () => {
	console.log(`Student Scheduler App listening at http://localhost:${port}`);
});

server.on("error", onError);
server.on("listening", onListening);
