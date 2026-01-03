const { TodoModel } = require("../models")

exports.createTodo = async(req,res) => {
  try {
    const data = req.body || req.body.data;

    if(!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide data to create todo"
      })
    }

    await TodoModel.create(data);

    return res.status(201).json({
      success: true,
      message: "Todo created successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}

exports.getAllTodos = async(req,res) => {
  try {
    const todos = await TodoModel.find();
    return res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}

exports.getTodoById = async(req,res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    if(!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found"
      })
    }
    return res.status(200).json({
      success: true,
      data: todo
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}

exports.updateTodoById = async(req,res) => {
  try {
    const { id } = req.params;
    const data = req.body || req.body.data;

    const todo = await TodoModel.findById(id);
    if(!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found"
      })
    }

    await TodoModel.findByIdAndUpdate(
      id,
      data,
      {new: true}
    )

    return res.status(201).json({
      success: true,
      message: "Todo Updated Successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}

exports.deleteTodoById = async(req,res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    if(!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found"
      })
    }
    await TodoModel.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      message: "Todo deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}