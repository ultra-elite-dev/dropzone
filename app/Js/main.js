import Dropzone from "dropzone"
import "dropzone/src/dropzone.scss";
import Sortable from "sortablejs";


let index = 1;
let myDropZone = new Dropzone("#my-form", {
    url: '/dropzone/app/upload.php',
    autoProcessQueue: false,
    acceptedFiles: ".jpg,.png,.jpeg",
    addRemoveLinks: true,
    uploadMultiple: true,
    parallelUploads: 5,
    maxFiles: 5,
    resize: function (file) {
        var resizeInfo = {
            srcX: 0,
            srcY: 0,
            trgX: 0,
            trgY: 0,
            srcWidth: file.width,
            srcHeight: file.height,
            trgWidth: this.options.thumbnailWidth,
            trgHeight: this.options.thumbnailHeight
        };

        return resizeInfo;
    },
    renameFile: function (file) {
        let newName =  index+ '_' + file.name;
        index++;
        return newName;
    },
    init: function () {
        var submitButton = document.querySelector("#submit-all");
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            myDropZone.processQueue();
        });
    },
    removedfile: function (file) {
        fetch('/dropzone/app/upload.php',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'fileName': file.upload.filename,
                'remove': true
            })
        }).then((data) => {
            file.previewElement.remove();
            return true;
        });
    }
});

let dropzoneElement = document.getElementsByClassName('dropzone');

Sortable.create(dropzoneElement[0], {
    items: '.dz-preview',
    cursor: 'move',
    opacity: 0.5,
    containment: '.dropzone',
    distance: 20,
    tolerance: 'pointer',
    onEnd: function () {
        var queue = myDropZone.files;
        let newQueue = [];
        let elementGroup = Object.values(document.getElementsByClassName('dz-filename'))
         elementGroup.forEach(function (el, count) {
            var name = el.querySelector('span').innerText;
            queue.forEach(function (file) {
                if (file.name === name) {
                    let iterator = count + 1;
                    Object.assign( file.upload, {filename:iterator+'_'+file.name});
                    newQueue.push(file);
                }
            });
        });
        myDropZone.files = newQueue;
    }
});