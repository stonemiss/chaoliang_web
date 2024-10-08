const webpack = require('webpack')
module.exports = {
    devServer: {
        open: true,
        port: 8082
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ],
        resolve: {
            alias: {
                assets: '@/assets',
                utils: '@/utils',
                components: '@/components',
                network: '@/network',
                update: '@/update',
                views: '@/views'
            }
        }
    }
}