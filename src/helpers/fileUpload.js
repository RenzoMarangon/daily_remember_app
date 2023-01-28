import Swal from "sweetalert2";

export const fileUpload = async( file ) =>{
    const cloudUrl = 'https://api.cloudinary.com/v1_1/groidb/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-rememberApp');
    formData.append('file', file);


    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if( resp.ok )
        {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    } catch (error) {
        console.log(error)
        Swal.fire('Error','Error at update photo', 'error');
    }
}