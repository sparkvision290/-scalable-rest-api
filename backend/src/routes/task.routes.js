const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getAllTasks,
  adminDeleteTask
} = require("../controllers/task.controller");

const router = express.Router();

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/tasks", authenticate, createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get logged-in user's tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's tasks
 *       401:
 *         description: Unauthorized
 */
router.get("/tasks", authenticate, getMyTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task (owner only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router.put("/tasks/:id", authenticate, updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task (owner only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router.delete("/tasks/:id", authenticate, deleteTask);

/**
 * @swagger
 * /api/v1/admin/tasks:
 *   get:
 *     summary: Admin - Get all tasks
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tasks returned
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get(
  "/admin/tasks",
  authenticate,
  authorizeRoles("ADMIN"),
  getAllTasks
);

/**
 * @swagger
 * /api/v1/admin/tasks/{id}:
 *   delete:
 *     summary: Admin - Delete any task
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted by admin
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router.delete(
  "/admin/tasks/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  adminDeleteTask
);

module.exports = router;
