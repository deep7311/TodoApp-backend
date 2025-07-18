// gettodo
// updatedtodo
// deletetodo

import todoModel from "../models/todo.model.js"
import userModel from "../models/user.model.js"


export const getToddo = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const todos = await todoModel.find({ userId: id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            todos,
        });
    } catch (error) {
        console.error("GetTodos Error: ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const addTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTodo = new todoModel({ task, userId: id });
    await newTodo.save();
    res.status(201).json({ success: true, message: "Todo added successfully", newTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateTodoStatus = async (req, res) => {
    try {
        const {id} = req.params
        const {status} = req.body
        const todo = await todoModel.findById(id)
        if(!todo) {
            return res.status(404).json({message: "Todo not found", success: false})
        }
        todo.status = status
        await todo.save()
        res.json({message: "Todo status updated", success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params
        const todo = await todoModel.findById(id)
        if(!todo) {
            return res.status(404).json({message: "Todo not found"})
        }
        await todoModel.findByIdAndDelete(id)
        res.status(200).json({message: "Todo deleted successfully", success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}