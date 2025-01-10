import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().trim().minLength(2).maxLength(30),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20).confirmed(),
  avatar: vine.string().trim().optional(),
  role: vine.string().optional(),
  birthday: vine.string().trim().optional(),
  address: vine.string().trim().optional(),
  phone: vine.string().optional(),
  gender: vine.string().optional(),
  language: vine.string().optional(),
  username: vine.string().trim().optional(),

});

export const accessSchema = vine.object({
  name: vine.string().trim().minLength(2).maxLength(30),
  description: vine.string().trim().optional(), 
  services: vine.array(vine.string()).optional(), // Ajout de vine.string() pour les éléments du tableau
  functionalities: vine.array(vine.string()).optional()
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6),
});

export const userSchema = vine.object({
  name: vine.string().trim().minLength(2).maxLength(30),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20),
  avatar: vine.string().trim().optional(),
  role: vine.string().optional(),
  birthday: vine.string().trim().optional(),
  address: vine.string().trim().optional(),
  phone: vine.string().optional(),
  gender: vine.string().optional(),
  language: vine.string().optional(),
  username: vine.string().trim().optional(),

});

