require "html-proofer"

task :default => [:test]

task :test do
    options = {
        assume_extension: true,
        url_ignore: ["#", /^mailto:\?subject=/],
        disable_external: true
    }
    HTMLProofer.check_directory("./_site", options).run
end
