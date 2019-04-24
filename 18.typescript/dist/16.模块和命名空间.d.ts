/**
 * 工具库  模块
 * 防止全局污染 命名空间
 */
declare let isletter: number;
declare let gogo: string;
declare namespace Shapes {
    namespace Pay {
        const nice = "good";
    }
}
import pay = Shapes.Pay;
declare const nice = "good";
