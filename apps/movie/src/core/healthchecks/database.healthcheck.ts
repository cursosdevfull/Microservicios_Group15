import { DatabaseBootstrap } from '../../bootstrap/database.bootstrap';
export async function databaseHealthcheck(): Promise<{ resource: string, status: string }> {
    try {
        await DatabaseBootstrap.dataSource.manager.query("SELECT 1");
        return { resource: "Database", status: "Up" };
    } catch (error) {
        console.error("Healthcheck failed:", error);
        throw new Error(JSON.stringify({ resource: "Database", status: "Down", error: "Healthcheck Database failed" }));
    }
}