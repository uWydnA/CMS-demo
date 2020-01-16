module.exports = {
    insert(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.data = options.data || [];
            options.colName.insertMany(options.data, (err) => {
                err ? reject(err) : resolve();
            })
        })
    },
    update(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.where = options.where || {};
            options.newdata = options.newdata || {};
            options.type = options.type || 1;
            options.type = options.type === 1 ? "updateOne" : "updateMany";
            options.colName[options.type](options.where, options.newdata, (err) => {
                err ? reject(err) : resolve();
            })
        })
    },
    delete(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.type = options.type || 1;
            options.type = options.type === 1 ? "deleteOne" : "deleteMany";
            options.where = options.where || {};
            options.colName[options.type](options.where, (err) => {
                err ? reject(err) : resolve();
            });
        })
    },
    find(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.where = options.where || {};
            options.show = options.show || {
                _id: 0,
                __v: 0
            };
            options.setting = options.setting || {};
            let find = options.colName.find(options.where, options.show, (ere, data) => {
                if (data.length != undefined) {
                    let arr = [];
                    data.forEach((val) => {
                        arr.push(val);
                    })
                    resolve(arr)
                } else {
                    reject(data);
                }
            });
            if (typeof options.setting.limit === "number") {
                find.limit(options.setting.limit);
            }
            if (typeof options.setting.skip === "number") {
                find.skip(options.setting.skip);
            }
            if (typeof options.setting.sort === "object") {
                find.sort(options.setting.sort);
            }
        })
    }
}