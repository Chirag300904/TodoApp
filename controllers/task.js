import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title, description } = req.body;

    const task = await Task.create({ title, description, user: userId });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const myTask = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();

    next(new Error("Task deleted successfully"));
  } catch (error) {
    next(error);
  }
};
