import { NextFunction, Request, Response } from "express";

type AsyncController = (req: Request, res: Response) => Promise<void>;
const catchAsync = (controller: AsyncController) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res).catch((err: unknown) => next(err));
    };
};

export default catchAsync;
