import { _Request, _Response } from "npm:express";
// import Models
import { User } from "../models/User.models.ts";

export class UserController {
  // Get a user by ID
  public static async getUserById(
    _req: _Request,
    _res: _Response
  ): Promise<void> {
    try {
      const user = await User.findById(_req.params.id); // Retrieve user by ID
      if (!user) {
        _res.status(404).json({ message: "User not found" });
        return;
      }
      _res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      _res.status(500).json({ message: "Internal server error" });
    }
  }

  // Create a new user
  public static async createUser(
    _req: _Request,
    _res: _Response
  ): Promise<void> {
    try {
      const newUser = new User(_req.body); // Create a new user instance
      const savedUser = await newUser.save(); // Save to the database
      _res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error creating user:", error);
      _res.status(400).json({ message: "Bad _request", error });
    }
  }

  // Update a user by ID
  public static async updateUser(
    _req: _Request,
    _res: _Response
  ): Promise<void> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _req.params.id,
        _req.body,
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure validation rules are applied
        }
      );
      if (!updatedUser) {
        _res.status(404).json({ message: "User not found" });
        return;
      }
      _res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      _res.status(400).json({ message: "Bad _request", error });
    }
  }

  // Delete a user by ID
  public static async deleteUser(
    _req: _Request,
    _res: _Response
  ): Promise<void> {
    try {
      const deletedUser = await User.findByIdAndDelete(_req.params.id); // Delete user by ID
      if (!deletedUser) {
        _res.status(404).json({ message: "User not found" });
        return;
      }
      _res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      _res.status(500).json({ message: "Internal server error" });
    }
  }


}
