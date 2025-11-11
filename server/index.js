import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Layout as Layout$1, Typography, Space, FloatButton, Carousel, Card, Divider, Row, Col } from "antd";
import { PhoneOutlined, FileProtectOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { FaMapLocationDot } from "react-icons/fa6";
import "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  // { rel: "icon", href: "/favicon.svg", type: "image/png" },
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    style: {
      height: "100%"
    },
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      style: {
        height: "100%",
        margin: 0
      },
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  fontSize: 22,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#cab34f"
};
const { Header, Footer, Content } = Layout$1;
const { Text, Title, Paragraph } = Typography;
const Welcome = () => {
  return /* @__PURE__ */ jsxs(
    Layout$1,
    {
      style: { minHeight: "100vh", display: "flex", flexDirection: "column" },
      children: [
        /* @__PURE__ */ jsx(Header, { style: headerStyle, children: /* @__PURE__ */ jsxs(Space, { children: [
          /* @__PURE__ */ jsx("img", { src: "/favicon.png", alt: "logo", width: "60" }),
          "AN NINH CITY"
        ] }) }),
        /* @__PURE__ */ jsxs(Content, { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsx(FloatButton, { icon: /* @__PURE__ */ jsx(PhoneOutlined, {}), type: "primary", href: "tel:0909773302", description: "Call" }),
          /* @__PURE__ */ jsxs(
            Carousel,
            {
              autoplay: { dotDuration: true },
              autoplaySpeed: 4e3,
              dots: true,
              draggable: true,
              arrows: true,
              style: {
                maxWidth: 1500,
                width: "100%",
                textAlign: "center",
                margin: "auto"
              },
              children: [
                /* @__PURE__ */ jsx(Card, { cover: /* @__PURE__ */ jsx("img", { src: "/images/1.png", alt: "welcome 1" }) }),
                /* @__PURE__ */ jsx(Card, { cover: /* @__PURE__ */ jsx("img", { src: "/images/2.png", alt: "welcome 2" }) }),
                /* @__PURE__ */ jsx(Card, { cover: /* @__PURE__ */ jsx("img", { src: "/images/3.png", alt: "welcome 3" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Typography, { children: [
            /* @__PURE__ */ jsx(Title, { level: 3, style: { textAlign: "center" }, children: "GIỚI THIỆU CÔNG TY TNHH BẢO VỆ AN NINH CITY" }),
            /* @__PURE__ */ jsxs(Paragraph, { children: [
              "Công ty Bảo vệ An Ninh City được sáng lập do các nhà lãnh đạo từng là các cựu chiến sĩ trong quân đội – công an, có nhiều năm kinh nghiệm trong lĩnh vực bảo vệ an ninh. An Ninh City tự hào là một trong những top công ty tiên phong trong lĩnh vực cung cấp các dịch vụ bảo vệ an ninh như: bảo vệ nhà máy – nhà xưởng – khu công nghiệp, tòa nhà – văn phòng công ty, công trình xây dựng, trường học bệnh viện, nhà hàng khách sạn resort,… được nhiều khách hàng đánh giá uy tín và chuyên nghiệp hiện nay.",
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/BAOVE.png",
                  alt: "welcome 1"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsxs(Typography, { children: [
            /* @__PURE__ */ jsx(Title, { level: 3, style: { textAlign: "center" }, children: "Vì sao nên chọn Dịch vụ Bảo vệ tại Công ty An Ninh City" }),
            /* @__PURE__ */ jsxs(Paragraph, { children: [
              "Để đạt được thành tích nhiều năm liền trong quá trình hoạt động, Công ty bảo vệ An Ninh City luôn tự tin mang đến cho quý khách hàng:",
              /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsx("li", { children: "Tính chuyên nghiệp: Đội ngũ nhân viên bảo vệ được công ty bảo vệ An Ninh City chọn lọc kỹ lưỡng, ưu tiên chọn bộ đội, công an xuất ngũ có kinh nghiệm trong lĩnh vực an ninh. Ngoài ra với +1000 nhân viên bảo vệ ưu tú và hơn 20 chi nhánh trên toàn quốc, chúng tôi tự tin khẳng định vị thế điểm mạnh của mình." }),
                /* @__PURE__ */ jsx("li", { children: "Tính chất lượng: Không những đội ngũ nhân viên ưu tú, chúng tôi còn có hệ thống quản lý chất lượng, kèm với những trang thiết bị hiện đại theo tiêu chuẩn ISO 9001:2015. Nhằm đảm bảo tính an toàn hiệu quả nhất trong quá trình hợp tác với khách hàng." }),
                /* @__PURE__ */ jsx("li", { children: "Tính linh hoạt: Bảng giá dịch vụ bảo vệ tại Công ty dịch vụ bảo vệ An Ninh City được công khai minh bạch cho khách hàng. Với mức chi phí cạnh tranh trên thị trường từ sơ cấp đến cao cấp đảm bảo đáp ứng được mọi nhu cầu của khách hàng." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsxs(Typography, { children: [
            /* @__PURE__ */ jsx(Title, { level: 3, style: { textAlign: "center" }, children: "3 lợi ích chính khi sử dụng dịch vụ bảo vệ An Ninh City" }),
            /* @__PURE__ */ jsxs(Paragraph, { children: [
              "Để đạt được thành tích nhiều năm liền trong quá trình hoạt động, Công ty bảo vệ An Ninh City luôn tự tin mang đến cho quý khách hàng:",
              /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsx("li", { children: "Đảm bảo tính an ninh cho doanh nghiệp, cá nhân, tài sản 24/7. Cung ứng các dịch vụ bảo vệ toàn diện dành cho khách hàng, luôn đảm bảo tính chuyên nghiệp – uy tín – an toàn. Cập nhật báo cáo định kỳ mỗi tuần, họp – thảo luận đưa ra những giải pháp khắc phục những nguy cơ xấu có thể xảy ra." }),
                /* @__PURE__ */ jsx("li", { children: "Luôn có những gói chi phí dịch vụ bảo vệ tối ưu dành cho khách hàng kèm những ưu đãi hấp dẫn, giúp quý khách được tiết kiệm được nhiều chi phí hơn. Toàn bộ mọi chi phí luôn được công khai minh bạch trong lúc ký hợp đồng dịch vụ đảm bảo không phát sinh thêm phí khác." }),
                /* @__PURE__ */ jsx("li", { children: "Tinh gọn hệ thống quản lý nhận sự chỉ với 1 gói dịch vụ bảo vệ chuyên nghiệp tại công ty An Ninh City, đảm bảo nhanh chóng – uy tín – chuyên nghiệp. Toàn bộ mọi vấn đề tuyển dụng, quản lý, giám sát, kiểm tra,… đều được công ty An Ninh City triển khai và hoạt động." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Footer,
          {
            style: {
              backgroundColor: "#cab34f",
              color: "#fff"
            },
            children: /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsxs(Space, { direction: "vertical", children: [
                /* @__PURE__ */ jsxs(Space, { children: [
                  /* @__PURE__ */ jsx(FileProtectOutlined, {}),
                  "GPKD: 0319232661 cấp ngày: 24/10/2025 bởi Sở Tài Chính TP.HCM"
                ] }),
                /* @__PURE__ */ jsxs(Space, { children: [
                  /* @__PURE__ */ jsx(FaMapLocationDot, {}),
                  "Địa chỉ: 38 Cộng Hoà, phường Tân Sơn Nhất, TP.HCM"
                ] }),
                /* @__PURE__ */ jsxs(Space, { children: [
                  /* @__PURE__ */ jsx(UserOutlined, {}),
                  "Người đại diện: Phạm Thị Lan Chi"
                ] })
              ] }) }),
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsxs(Space, { direction: "vertical", children: [
                /* @__PURE__ */ jsxs(Space, { children: [
                  /* @__PURE__ */ jsx(PhoneOutlined, {}),
                  /* @__PURE__ */ jsx(
                    Text,
                    {
                      style: { color: "#fff" },
                      copyable: { text: "0909773302" },
                      children: "Hotline: 0909 7733 02"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(Space, { children: [
                  /* @__PURE__ */ jsx(MailOutlined, {}),
                  /* @__PURE__ */ jsx(Text, { style: { color: "#fff" }, copyable: true, children: "baove.anninhcity@gmail.com" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs(Col, { span: 24, style: { textAlign: "center" }, children: [
                "An ninh city ©",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " Made with ❤ by An ninh city development team"
              ] })
            ] })
          }
        )
      ]
    }
  );
};
function meta({}) {
  return [{
    title: "An ninh City"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/anninh-cityassets/entry.client-BnCtv8PC.js", "imports": ["/anninh-cityassets/chunk-UIGDSWPH-C_7xOnb1.js", "/anninh-cityassets/index-L2k8Hile.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/anninh-cityassets/root-BzR4PSOt.js", "imports": ["/anninh-cityassets/chunk-UIGDSWPH-C_7xOnb1.js", "/anninh-cityassets/index-L2k8Hile.js"], "css": ["/anninh-cityassets/root-CgCWpPwo.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/anninh-cityassets/home-C-HXmB9-.js", "imports": ["/anninh-cityassets/chunk-UIGDSWPH-C_7xOnb1.js", "/anninh-cityassets/index-L2k8Hile.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/anninh-cityassets/manifest-f578154a.js", "version": "f578154a", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/anninh-city";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
