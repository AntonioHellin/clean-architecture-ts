import { InMemoryOrderRepository } from "@infraestructure/InMemoryOrderRepository";
import { CreateOrder } from "@application/use-cases/CreateOrder";

const repo = new InMemoryOrderRepository();
export const createOrder = new CreateOrder(repo);
