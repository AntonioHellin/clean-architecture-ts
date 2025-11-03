import {checkHealth} from "../../src/shared/health";

describe("checkHealth", () => {
	it("should return status ok and a timestamp", () => {
        const result = checkHealth();
        expect(result.status).toBe("ok");
        expect(result.timestamp).toBeInstanceOf(Date);
	});

    it("should return current timestamp", () => {
        const before = new Date();
        const result = checkHealth();
        const after = new Date();

        expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(result.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });
});
