import os
import subprocess
import shutil

def deploy_gh_pages():
    dist_dir = os.path.abspath("frontend/dist")
    if not os.path.exists(dist_dir):
        print("frontend/dist does not exist! Run build first.")
        return

    # Create a clean temporary directory
    deploy_dir = os.path.abspath(".deploy_temp")
    if os.path.exists(deploy_dir):
        shutil.rmtree(deploy_dir)
    
    print("Copying dist contents to temp deploy directory...")
    shutil.copytree(dist_dir, deploy_dir)

    # Also add a .nojekyll file to prevent GitHub from ignoring files
    nojekyll = os.path.join(deploy_dir, ".nojekyll")
    with open(nojekyll, "w") as f:
        f.write("")

    # Also add a 404.html that is a copy of index.html for SPA fallback
    shutil.copyfile(os.path.join(dist_dir, "index.html"), os.path.join(deploy_dir, "404.html"))

    # Remote URL
    remote_url = "https://github.com/lakshya212/HARMONY.git"

    print("Initializing git in deploy directory...")
    subprocess.run(["git", "init"], cwd=deploy_dir, check=True)
    subprocess.run(["git", "config", "user.name", "Lakshya Shukla"], cwd=deploy_dir, check=True)
    subprocess.run(["git", "config", "user.email", "lakshyashukla.bcr24257@imsnoida.com"], cwd=deploy_dir, check=True)
    subprocess.run(["git", "checkout", "-b", "gh-pages"], cwd=deploy_dir, check=True)
    subprocess.run(["git", "add", "-A"], cwd=deploy_dir, check=True)
    subprocess.run(["git", "commit", "-m", "deploy: release production build to gh-pages"], cwd=deploy_dir, check=True)
    subprocess.run(["git", "remote", "add", "origin", remote_url], cwd=deploy_dir, check=True)
    
    print("Pushing to origin gh-pages...")
    res = subprocess.run(["git", "push", "origin", "gh-pages", "--force"], cwd=deploy_dir, capture_output=True, text=True)
    print("Push output:", res.stdout)
    if res.stderr:
        print("Push stderr/info:", res.stderr)
        
    print("Cleaning up temp directory...")
    shutil.rmtree(deploy_dir, ignore_errors=True)
    
    if res.returncode == 0:
        print("\nSUCCESS! Successfully deployed to GitHub Pages:")
        print("URL: https://lakshya212.github.io/HARMONY/")
    else:
        print("\nPush failed:", res.stderr)

if __name__ == "__main__":
    deploy_gh_pages()
