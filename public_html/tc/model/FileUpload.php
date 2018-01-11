<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of FileUpload
 *
 * @author Tristan O'Rourke
 */
class FileUpload {
    //put your code here
    protected $file_id;
    protected $file_name;
    protected $file_content;
    protected $last_updated;
    
    public function __construct($file_id, $file_name, $file_content, $last_updated) {
        $this->file_id = $file_id;
        $this->file_name = $file_name;
        $this->file_content = $file_content;
        $this->last_updated = $last_updated;
    }

    public function getFile_id() {
        return $this->file_id;
    }

    public function getFile_name() {
        return $this->file_name;
    }

    public function getFile_content() {
        return $this->file_content;
    }

    public function getLast_updated() {
        return $this->last_updated;
    }

    public function setFile_id($file_id) {
        $this->file_id = $file_id;
    }

    public function setFile_name($file_name) {
        $this->file_name = $file_name;
    }

    public function setFile_content($file_content) {
        $this->file_content = $file_content;
    }

    public function setLast_updated($last_updated) {
        $this->last_updated = $last_updated;
    }


}