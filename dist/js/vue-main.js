const routes = [
    {
        path: '/user/:id',
        component: {
            template: '<div>User {{$route.params.id}}</div>',
            watch: {
                $route(to, from) {
                    console.log(to, from);
                }
            }
        }
    }, {
        path: '/foo',
        component: {
            template: '.fdsa./html/document.html'
        }
    }, {
        path: '/bar',
        component: {
            template: '<div>bar</div>'
        }
    }
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    router
}).$mount('#app');
