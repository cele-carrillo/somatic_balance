require "html-proofer"

task :default => [:test]

disable_external = ENV["CI"] == "true"

task :test do
    options = {
        assume_extension: true,
        url_ignore: ["#", /^mailto:\?subject=/],
        internal_domains: ["somaticbalance.com.au"],
        disable_external: disable_external,
        http_status_ignore: [999],
        check_favicon: true,
        check_html: true,
        check_img_http: true,
        enforce_https: true
    }
    HTMLProofer.check_directory("./_site", options).run
end
