import { bcryptHash } from "../helpers/crypt.helpers"
import { Document, Model, Schema, Types, model } from "mongoose"
import { IPost } from "./Post"
import { IComment } from "./Comment"

export interface IUser extends Document {
  name: string
  token: string
  password: string
  resetPasswordToken: string
  resetPasswordDate: Date
  role: string
  username: string
  birthday: Date
  email: string
  avatar?: string
  phone?: string
  comments?: IComment['_id'][]
  posts?: IPost['_id'][]
}

export const userSchema = new Schema<IUser>(
  {
    name: String,
    token: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordDate: Date,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      default: 'None',
      validate: [function (email: string) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
      }, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birthday: { type: Date, required: false },
    avatar: {
      type: String,
      required: false,
      default:
        'https://images.ladbible.com/resize?type=jpeg&url=http://20.theladbiblegroup.com/s3/content/1f1749975876b1a1df3e9670a0e7c733.jpg&quality=70&width=720&aspectratio=16:9&extend=white',
    },
    phone: String,
    posts: [{ type: Types.ObjectId, ref: 'Post', default: [] }],
    comments: [{ type: Types.ObjectId, ref: 'Comment', default: [] }],
  },

  { timestamps: { createdAt: true, updatedAt: true } }
)

interface UserModel extends Model<IUser> {
  seedAdmin: any
}

userSchema.statics.seedAdmin = async () => {
  try {
    const users: IUser[] = await User.find({})
    if (users.length > 0) return
    const password = 'admin'
    const passwordHash = await bcryptHash(password)
    const newAccount = await new User({
      username: 'admin',
      name: 'Little chef',
      password: passwordHash,
      role: 'admin',
      phone: '0123456789',
      birthday: '02-02-2002',
    }).save()

    console.log(newAccount)
  } catch (error) {
    console.log(error)
  }
}

const User: UserModel = model<IUser, UserModel>('User', userSchema)

export default User