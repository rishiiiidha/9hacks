import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProjectInfoUpload() {
    const [projectName, setProjectName] = useState('');
    const [gitHubLink, setGitHubLink] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [hasProjects, setHasProjects] = useState(false); 
    const [showForm, setShowForm] = useState(false); 
    const [submittedProject, setSubmittedProject] = useState(null);

    useEffect(() => {
       
        const backAction = () => {
            if (submittedProject && !showForm) {
                // If a project is submitted and form is not visible, go back to form
                setShowForm(true);
                setSubmittedProject(null); // Reset to prepare for a new project submission
                return true; // Prevent default back action
            }
            return false; // Allow default back action
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [submittedProject, showForm]);

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

    const handleSubmit = async () => {
        const projectData = {
            project_name: projectName,
            project_description: description,
            project_link: gitHubLink,
        };

        try {
            const response = await fetch('http://192.168.0.199:3000/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Project Submitted', result);

            Alert.alert("Success", "Project submitted successfully!");

            setSubmittedProject({
                project_name: projectName,
                project_link: gitHubLink,
                project_description: description,
                image: image
            });

            setProjectName('');
            setGitHubLink('');
            setDescription('');
            setImage(null);
            setHasProjects(true);
            setShowForm(false);
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    };

    if (!hasProjects && !showForm) {
        // No projects state
        return (
            <View style={styles.noProjectContainer}>
                <Text style={styles.noProjectText}>No Projects Found</Text>
                <TouchableOpacity style={styles.createButton} onPress={() => setShowForm(true)}>
                    <Text style={styles.createButtonText}>Create New Project</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {showForm ? (
                <>
                    <Text style={styles.headerText}>Project Info</Text>

                    <TextInput
                        placeholder="Project Name"
                        value={projectName}
                        onChangeText={setProjectName}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="GitHub Link"
                        value={gitHubLink}
                        onChangeText={setGitHubLink}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        style={[styles.input, styles.descriptionInput]}
                    />

                    <TouchableOpacity onPress={pickImage} style={styles.imageUploadButton}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.imagePreview} />
                        ) : (
                            <Text style={styles.imagePlaceholder}>Upload Project Image</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.submit}>Submit</Text>
                    </TouchableOpacity>
                </>
            ) : (
                submittedProject && (
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectText}>Project Name: {submittedProject.project_name}</Text>
                        <Text style={styles.projectText}>GitHub Link: {submittedProject.project_link}</Text>
                        <Text style={styles.projectText}>Description: {submittedProject.project_description}</Text>
                        {submittedProject.image && <Image source={{ uri: submittedProject.image }} style={styles.imagePreviewSmall} />}
                        <Button title="Create Another Project" onPress={() => setShowForm(true)} color="#000" />
                    </View>
                )
            )}
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    noProjectContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noProjectText: {
        fontSize: 20,
        fontFamily: 'Poppins_500Medium',
        marginBottom: 20,
    },
    createButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderWidth:1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: 'white',
        fontFamily: 'Poppins_500Medium',
    },
    descriptionInput: {
        fontFamily: 'Poppins_500Medium',
        height: '20%',
    },
    imageUploadButton: {
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderColor: '#000',
        borderWidth:1,
    },
    imagePlaceholder: {
        color: '#757575',
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imagePreviewSmall: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 15,
    },
    projectContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    projectText: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Poppins_500Medium',
    },
    submit: {
        backgroundColor: '#000',
        color:'#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
    },
});
