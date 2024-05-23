import { Response } from "express"

export const sendRes = (res: Response, statusNum: number, success: boolean, message: string, data: any) => {
  res.status(statusNum).json({
    success,
    api_message: message,
    data
  })
}
