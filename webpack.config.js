const path=require('path')
const serverConfig={
    mode:'development',
    target:'node',
    entry:'./server.js',
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'Bundle.js'
    },
    devtool:'source-map',
    module:{
        rules:[
            {
                test: /\.js$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:'/Users/tajsapra/Desktop/Training Assignments/Training Project Giphy SSR and other Features/node_modules'
            },
            {
                test: /\.css$/,
                use:[
                    'css-loader',
                    'style-loader'
                ],
            },
        ]
    }
}
const clientConfig={
    mode:'development',
    target:'web',
    entry:'./client.js',
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'clientBundle.js'
    },
    devtool:'source-map',
    module:{
        rules:[
            {
                test: /\.js$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:'/Users/tajsapra/Desktop/Training Assignments/Training Project Giphy SSR and other Features/node_modules'
            },
            {
                test: /\.css$/,
                use:[
                    'css-loader',
                    'style-loader'
                ],
            },
        ]
    }
}
module.exports=[serverConfig, clientConfig]