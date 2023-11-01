import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const CredentialSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },

    image: {
        type: String,

    },
    role: {
        type: String,
        default: 'user',
    },
    provider: {
        type: String,
        default: 'credentials'
    },
    status: {
        type: String,
        default: 'active', // You can set the default status as 'active'
    },



}, { timestamps: true })


/**
 * ? This is the correct way to hash passwords
CredentialSchema.pre("save", function (next) {
    const user = this;

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }

                    user.password = hash;
                    next();
                });
            }
        });
    } else {
        return next();
    }
});


CredentialSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}

 */
const Credential = models.Credential || model("Credential", CredentialSchema)

export default Credential;