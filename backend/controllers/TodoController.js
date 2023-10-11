import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export const getTodo = async (req, res) => {
  try {
    const response = await prisma.data.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getTodoById = async (req, res) => {
  try {
    const response = await prisma.data.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
export const createTodo = async (req, res) => {
  const { nama, email } = req.body;
  try {
    const todo = await prisma.data.create({
      data: {
        title: nama,
        description: email,
      },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateTodo = async (req, res) => {
  const { nama, email } = req.body;
  try {
    const todo = await prisma.data.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: nama,
        description: email,
      },
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const todo = await prisma.data.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};