import Database from 'better-sqlite3';
import fs from 'fs';
import { DB_PATH, DB_LOG } from '$env/static/private';

const db = new Database(DB_PATH, { verbose: DB_LOG == 1 ? console.log : null });
db.exec(fs.readFileSync("./db/sql/schema.sql", "utf8"));

export function getPath() {
	return DB_PATH;
}

export function insertNode(node) {
	return db.prepare(fs.readFileSync("./db/sql/insert-node.sql", "utf8")).run(node);
}

export function updateNode(id, node) {
	return db.prepare(fs.readFileSync("./db/sql/update-node.sql", "utf8")).run([node, id]);
}

export function deleteNode(id) {
	return db.prepare(fs.readFileSync("./db/sql/delete-node.sql", "utf8")).run(id);
}

export function searchNode(name = "%") {
	return db.prepare(fs.readFileSync("./db/sql/search-node.sql", "utf8")).all(name);
}

export function searchEdges(id = "%") {
	return db.prepare(fs.readFileSync("./db/sql/search-edges.sql", "utf8")).all([id, id]);
}

export function insertEdge(id, target, node) {
	return db.prepare(fs.readFileSync("./db/sql/insert-edge.sql", "utf8")).run([id, target,node]);
}

export function findEdge(id, target) {
	return db.prepare(fs.readFileSync("./db/sql/find-edge.sql", "utf8")).all([id, target]);
}

export function deleteEdge(id, target) {
	return db.prepare(fs.readFileSync("./db/sql/delete-edge.sql", "utf8")).run([id, target]);
}