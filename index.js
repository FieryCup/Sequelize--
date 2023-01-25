const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("social_network", "root", "root", {
    host: "localhost",
    dialect: "mysql"
})

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM(["male", "female"]),
      allowNull: true
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: "users",
    timestamps: false
  });

  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "posts",
    timestamps: false
  });

;(async () => {
    try {
        await User.sync({
            alter: true,
            force: false
        })

        await Post.sync({
            alter: true,
            force: false
        })

        let users = await User.findAll()
        console.log("Все пользователи", users);

        const user = await User.findByPk(8);
        console.log("Пользователя с ID", user.id, "зовут", user.first_name, user.last_name);

        users = await User.findAll({
            where: {
                country: "Россия"
            }
        })
        console.log(users);

        let jane = await User.create({
            first_name: "Jane",
            last_name: "Joe",
            email: "jane@example.con",
            password: "ffggweggs"
        });
        console.log("Создан пользователь с id:", jane.id);

        jane.password = "123123123";
        jane.save();
        console.log("Пароль изменен на:", jane.password);

        jane.destroy();
        console.log("Пользователь с id", jane.id, "был удален");

      } catch (error) {
        console.error(error);
      }
})();
