export const sanitizeFilename = (gameName: string) => {
    const safeGameName = gameName.replace(/[^a-z0-9_\-& ]/gi, '_').trim();
    return `${safeGameName}.jpg`;
};

const main = () => {
    let _observer: MutationObserver | null = null;
    let _lastImageCount = 0;

    const _findImages = () => {
        // Find all images with the specific src pattern within #main-container
        // Example: https://images.igdb.com/igdb/image/upload/t_cover_big/co2xxq.webp
        const _images = Array.from(document.querySelectorAll('#main-container img[src*="/image/upload/t_cover_big/"]'));
        if (_images.length > _lastImageCount) {
            // New images found, update count
            _lastImageCount = _images.length;
        } else if (_images.length === _lastImageCount && _images.length > 0) {
            // No new images, assume loading is done
            if (_observer) {
                _observer.disconnect();
                _observer = null;
            }
            const image = _images[0] as HTMLImageElement | undefined;
            if (image) {
                let src = image.src.replace(/\/t_cover_big\//, '/t_original/');
                // Replace webp with jpg if necessary
                if (src.endsWith('.webp')) {
                    src = src.replace(/\.webp$/, '.jpg');
                }

                // Get game name from the image alt text
                const gameName = image.alt.replace(/ cover$/, '');
                const filename = sanitizeFilename(gameName);

                // Create a button to trigger download
                const button = document.createElement('button');
                button.textContent = 'Download Cover';
                button.style.position = 'absolute';
                button.style.top = '0';
                button.style.right = '0';
                button.style.backgroundColor = '#000';
                button.style.color = 'white';
                button.style.padding = '5px';
                button.style.zIndex = '1000';
                button.style.textDecoration = 'none';
                button.style.fontSize = '12px';
                button.style.borderRadius = '3px';
                button.style.cursor = 'pointer';

                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    // Fetch the image as a blob and trigger download
                    const response = await fetch(src);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }, 100);
                });

                // Append the button to the image's parent element
                if (image.parentElement) {
                    image.parentElement.style.position = 'relative'; // Ensure the parent is positioned
                    image.parentElement.appendChild(button);
                }
            }
        }
    };

    _findImages();

    _observer = new MutationObserver(() => _findImages());
    _observer.observe(document.body, { childList: true, subtree: true });
};

if (typeof document !== 'undefined') {
    main();
}