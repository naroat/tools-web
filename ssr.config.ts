import {constantRoute} from "./src/router/router"
import vitePluginSeoPrerender from "vite-plugin-seo-prerender";
export function seoperender(){
    const filterPath = ['/:pathMatch(.*)*', '/404']; // 排除的路径
    return vitePluginSeoPrerender({
        routes: constantRoute.map(routeConfig => routeConfig.path).filter(path => !filterPath.includes(path)),
        network: true,
        // removeStyle: true
    })
}