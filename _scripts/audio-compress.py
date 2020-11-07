import glob
import os
import numpy as np
import subprocess

def convert():
    this_dir = os.path.dirname(os.path.realpath(__file__))

    src_audio_dir = os.path.join(this_dir, 'audio_original')
    src_glob = os.path.join(src_audio_dir, '*.mp3')
    src_paths = glob.glob(src_glob)
    src_files = [os.path.basename(f) for f in src_paths]

    dst_audio_dir = os.path.join(this_dir, '..', 'res', 'audio')
    dst_glob = os.path.join(dst_audio_dir, '*.mp3')
    dst_paths = glob.glob(dst_glob)
    dst_files = [os.path.basename(f) for f in dst_paths]

    files_to_convert = np.setdiff1d(src_files, dst_files)
    for f in files_to_convert:
        src = os.path.join(src_audio_dir, f)
        dst = os.path.join(dst_audio_dir, f)
        command = ["ffmpeg", "-i", src, "-map", "0:a:0", "-b:a", "96k", dst]
        subprocess.check_call(command)

if __name__ == '__main__':
    convert()