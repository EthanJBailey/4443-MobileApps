import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Import MaterialIcons and FontAwesome for icons
import Constants from 'expo-constants';
import axios from 'axios';
import headerbg from "../images/testbg2.jpg"


const apiUrl = 'http://142.93.185.100:8084';
const Url = 'http://142.93.185.100';

const BlogPage = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/recipe/posts`);
            setPosts(response.data.reverse()); // Reverse the order of posts
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }        
    };

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }        
    };

    const createPost = async () => {
        try {
            const uploadedImage = await uploadImage();
            const postData = {
                title: title,
                description: description,
                image: uploadedImage,
                category: 'recipe_post',
            };
    
            await axios.post(`${apiUrl}/recipe/posts`, postData);

            // Reset image state to null
            setImage(null);

            // Refresh posts after creating a new one
            fetchPosts();
            setModalVisible(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    
    const uploadImage = async () => {
        try {
            const formData = new FormData();
    
            // Extract filename from URI
            const uriParts = image.split('/');
            const fileName = uriParts[uriParts.length - 1];
    
            const fileType = fileName.split('.')[1];
            formData.append('file', {
                uri: image,
                name: fileName, // Use extracted filename
                type: `image/${fileType}`,
            });
    
            const response = await axios.post(`${apiUrl}/recipe/upload-image/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            return response.data.filename; // Return the uploaded image filename from the response
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };
    
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Header Background Image */}
                <ImageBackground source={headerbg} style={styles.headerBackground}>
                    {/* Logo */}
                    {/* <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}/>
                    </View> */}
                </ImageBackground>

                {/* Title, Create Post button, and Join Discussion button */}
                <View style={styles.header}>
                    <Text style={styles.title}>Share Your Secrets</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Discussion')}>
                        <Text style={styles.joinDiscussion}>Join the Discussion</Text>
                    </TouchableOpacity>
                </View>

                {/* Display existing posts */}
                {posts.map((post, index) => (
                    <View key={post._id || index} style={styles.postContainer}>
                        <Text style={styles.PostUsername}>{post.user}</Text>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text style={styles.postDescription}>{post.description}</Text>
                        <Image source={{ uri: `${Url}/images/${post.image}` }} style={styles.postImage} />
                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                <Text style={styles.iconText}>Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.iconText}>Comment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.iconText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.comments}>{post.comments} comments</Text>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.postButton}>
                <Text style={styles.createPost}>Create Post</Text>
            </TouchableOpacity>

            {/* Modal for creating a new post */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeaderText}>Create Your Post Below:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        onChangeText={setDescription}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                            <MaterialIcons name="image" size={24} color="white" />
                            <Text style={styles.pickImageText}>Pick Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.takeImageButton} onPress={takeImage}>
                            <MaterialIcons name="photo-camera" size={24} color="white" />
                            <Text style={styles.pickImageText}>Take Image</Text>
                        </TouchableOpacity>
                    </View>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                    <TouchableOpacity style={styles.createPostButton} onPress={createPost}>
                        <FontAwesome name="check" size={20} color="white" />
                        <Text style={styles.createPostText}>Submit Post</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    postButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    createPost: {
        color: '#fff',
        backgroundColor: '#97694F',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginLeft: 10,
    },
    joinDiscussion: {
        color: '#fff',
        backgroundColor: '#97694F',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20, // Adjust this margin as needed
        textAlign: 'center', // Align the text to the center
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    imagePreview: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginBottom: 10,
    },
    postContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 25,
        opacity:0.95,
    },
    postImage: { 
        width: '100%',
        height: 300,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    iconText: {
        marginLeft: 4,
        fontWeight: 'bold',
    },
    likes: {
        marginLeft: 12,
        fontWeight: 'bold',
    },
    comments: {
        marginLeft: 12,
        color: 'gray',
    },
    PostUsername: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    pickImageButton: {
        marginRight: 30,
        flexDirection: 'row',
        backgroundColor: '#97694F',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    takeImageButton: {
        flexDirection: 'row',
        backgroundColor: '#97694F',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    pickImageText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    createPostButton: {
        backgroundColor: '#97694F',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    createPostText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.60, // semi-transparent
      },
});

export default BlogPage;
