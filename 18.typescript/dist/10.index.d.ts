interface encrypt {
    (key: string, value: string): string;
}
declare var md5: encrypt;
declare var sha1: encrypt;
